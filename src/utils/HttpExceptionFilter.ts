// import { getI18nContextFromRequest } from 'nestjs-i18n';
import { I18nContext } from 'nestjs-i18n';
import { Request } from 'express';
import { HttpException as NestHttException, HttpStatus } from '@nestjs/common';
import { RequestContext } from 'nestjs-request-context';

export class HttpException extends NestHttException {
  constructor(
    status: HttpStatus,
    entity?: string,
    gender: 'm' | 'f' | 'mp' | 'fp' = 'm',
    takeFrom = 'entities',
  ) {
    const req: Request = RequestContext.currentContext.req;
    // const i18n = getI18nContextFromRequest(req);
    const i18n = I18nContext.current();
    let error = '';

    switch (status) {
      case 400:
        error = i18n.t('lang.BAD_REQUEST');
        break;
      case 401:
        error = i18n.t('lang.UNAUTHORIZED');
        break;
      case 403:
        error = i18n.t('lang.FORBIDDEN');
        break;
      case 404:
        error = i18n.t('lang.NOT_FOUND', {
          args: {
            entity: entity
              ? i18n.t(`${takeFrom}.${entity}`)
              : i18n.t('lang.RESOURCE'),
            gender,
          },
        });
        break;
      case 409:
        error = i18n.t('lang.CONFLICT', {
          args: {
            entity: entity
              ? i18n.t(`${takeFrom}.${entity}`)
              : i18n.t('lang.RESOURCE'),
            gender,
          },
        });
        break;
      default:
        error = i18n.t('lang.INTERNAL_SERVER_ERROR');
        break;
    }

    super(error, status);
  }
}

export class HttpExceptionMessage extends NestHttException {
  constructor(status: HttpStatus, message: string) {
    const req: Request = RequestContext.currentContext.req;
    // const i18n = getI18nContextFromRequest(req);
    const i18n = I18nContext.current();

    const error = i18n.t(`messages.${message}`);

    super(error, status);
  }
}
