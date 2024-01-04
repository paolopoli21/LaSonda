namespace LaSonda.Api.Errors
{
    public class CodeErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;

        public CodeErrorResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageStatusCode(statusCode);
        }

        private string GetDefaultMessageStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "La riquiesta ha degli errori",
                401 => "Non hai delle autorizzazione per questa risorsa",
                404 => "Non è stato possibile trovare la risorsa richiesta",
                500 => "Ci sono degli errori nel server",
                _ => string.Empty
            };
        }
    }
}
