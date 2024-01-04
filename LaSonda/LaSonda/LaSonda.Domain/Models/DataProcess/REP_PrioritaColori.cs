using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Domain.Models.DataProcess
{
    public class REP_PrioritaColori
    {
        [Key]
        public int IDPriorita { get; set; }
        public string Descrizione { get; set; }
        public string Colore { get; set; }
    }
}
