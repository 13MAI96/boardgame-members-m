import { ErrorHandler, Injectable } from '@angular/core';

export class ErrorHandlerService implements ErrorHandler{

  handleError(error: any): void {
    console.error({
      message: error.message,
      date: new Date().toString(),
    })
  }
  
}
