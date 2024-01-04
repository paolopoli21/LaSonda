using System;


namespace LaSonda.Application.Exceptions
{
    public class NoFoundException : ApplicationException
    {
        public NoFoundException(string nameClass, object keyRow) :base($"Entity \"{nameClass} \" ({keyRow}) not fount")
        {

        }
    }
}
