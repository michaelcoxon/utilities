﻿/** Common content encondings */
export enum HttpContentEncoding
{
    utf8 = "utf-8",
}
 /** common header names */
export enum KnownHeaderNames
{
    accept = "Accept",
    authorization = "Authorization",
    cacheControl = "Cache-Control",
    contentType = "Content-Type",
    contentLength= "Content-Length",
}

/** common content types */
export enum KnownContentTypes
{
    any = "*/*",
    json = "application/json",
    plainText = "text/plain",
    xml = "text/xml",
    html = "text/html",
    multipart = "multipart/form-data",
}

/** Http methods */
export enum HttpMethod
{
    get = "GET",
    head = "HEAD",
    post = "POST",
    put = "PUT",
    delete = "DELETE",
    connect = "CONNECT",
    options = "OPTIONS",
    patch = "PATCH"
}

/** Denotes the response type if known */
export enum HttpResponseType
{
    unknown = "",
    arrayBuffer = "arraybuffer",
    blob = "blob",
    document = "document",
    json = "json",
    text = "text",
}

/** Status codes for responses */
export enum HttpStatusCode
{
    continue = 100,
    switchingProtocols = 101,
    ok = 200,
    created = 201,
    accepted = 202,
    nonAuthoritativeInformation = 203,
    noContent = 204,
    resetContent = 205,
    partialContent = 206,
    multipleChoices = 300,
    movedPermanently = 301,
    found = 302,
    seeOther = 303,
    notModified = 304,
    useProxy = 305,
    temporaryRedirect = 307,
    badRequest = 400,
    unauthorized = 401,
    paymentRequired = 402,
    forbidden = 403,
    notFound = 404,
    methodNotAllowed = 405,
    notAcceptable = 406,
    proxyAuthenticationRequired = 407,
    requestTimeout = 408,
    conflict = 409,
    gone = 410,
    lengthRequired = 411,
    preconditionFailed = 412,
    requestEntityTooLarge = 413,
    requestUriTooLong = 414,
    unsupportedMediaType = 415,
    requestedRangeNotSatisfiable = 416,
    expectationFailed = 417,
    unprocessableEntity = 422,
    tooManyRequests = 429,
    internalServerError = 500,
    notImplemented = 501,
    badGateway = 502,
    serviceUnavailable = 503,
    gatewayTimeout = 504,
    httpVersionNotSupported = 505
}