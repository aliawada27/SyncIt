// =============================================================================
// SYNCIT BACKEND - LOGGER CONFIGURATION
// =============================================================================

import winston from 'winston';

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

// Custom log format for development
const developmentFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger configuration
const loggerConfig: winston.LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true })
  ),
  defaultMeta: {
    service: 'syncit-backend',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: []
};

// Development configuration
if (process.env.NODE_ENV === 'development') {
  loggerConfig.format = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    developmentFormat
  );
  
  loggerConfig.transports!.push(
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true
    })
  );
} else {
  // Production configuration
  loggerConfig.format = combine(
    timestamp(),
    errors({ stack: true }),
    json()
  );
  
  loggerConfig.transports!.push(
    // Console output in production
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true
    }),
    
    // Error log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // Combined log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );
}

// Create logger instance
export const logger = winston.createLogger(loggerConfig);

// Export child logger for specific modules
export const createModuleLogger = (module: string) => {
  return logger.child({ module });
};

// Helper functions for consistent logging
export const loggers = {
  auth: createModuleLogger('auth'),
  database: createModuleLogger('database'),
  redis: createModuleLogger('redis'),
  socket: createModuleLogger('socket'),
  graphql: createModuleLogger('graphql'),
  middleware: createModuleLogger('middleware'),
  routes: createModuleLogger('routes'),
  services: createModuleLogger('services')
};

// Request logging helper
export const logRequest = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  // Log request
  logger.info(`${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    userId: req.user?.id
  });
  
  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    
    logger.log(logLevel, `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      userId: req.user?.id
    });
  });
  
  next();
};

// Error logging helper
export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error(error.message, {
    stack: error.stack,
    ...context
  });
};

// Performance logging helper
export const logPerformance = (operation: string, duration: number, context?: Record<string, any>) => {
  logger.info(`Performance: ${operation} completed in ${duration}ms`, {
    operation,
    duration,
    ...context
  });
}; 