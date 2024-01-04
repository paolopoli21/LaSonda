using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Domain.Models.Monitoring
{
    public class MON_LastUpdate
    {
        [Key]
        public DateTime LastUpdate { get; set; }
    }
}
