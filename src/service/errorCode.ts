type JsonObject = { [Key in string]?: string } | undefined

const getErrorMessage = (status: string, data: any) => {
  const ERROR_CODES: JsonObject = {
  }
  const ERROR_HTTP_CODES: JsonObject = {
    400: 'Request failed',
    401: 'Unauthorized Error',
    403: 'forbidden error',
    404: 'Error',
    405: 'Http Method failed',
    408: 'Timeout',
    500: 'API failed',
    501: 'API failed',
    502: 'Gateway failed',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
  }

  let isNumber = /^[0-9]+$/.test(status)

  let errorText = ERROR_CODES[data?.code]
  if (['', null, undefined].includes(errorText)) errorText = data?.message ? data?.message : 'error'
  let errorHTTP = (isNumber) ? `[HTTP ${status}] ${ERROR_HTTP_CODES[status]}` : `[${status}]`
  return { errorText: errorText, errorHTTP: errorHTTP }
}

export default getErrorMessage;