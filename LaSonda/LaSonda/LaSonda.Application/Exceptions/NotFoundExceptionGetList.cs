using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Exceptions
{
    public class NotFoundExceptionGetList: ApplicationException
    {
        public NotFoundExceptionGetList(string nameClass) : base($"Entity \"{nameClass} \" not fount")
        {

        }
    }
}
