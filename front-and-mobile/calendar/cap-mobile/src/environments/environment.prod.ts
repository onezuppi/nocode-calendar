import { ServerTrustModes } from '@abanking/base-http-request-mobile';

export const environment: {
    production: boolean;
    httpMobile: {
        enableSslPinning: boolean;
        serverTrustMode?: ServerTrustModes
    };
} = {
    production: true,
    httpMobile: {
        enableSslPinning: true,
        serverTrustMode: ServerTrustModes.nocheck
    }
};
