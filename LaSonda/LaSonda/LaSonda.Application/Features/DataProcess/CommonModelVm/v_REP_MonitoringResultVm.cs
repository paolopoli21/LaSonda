using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.DataProcess.CommonModelVm
{
    public class v_REP_MonitoringResultVm
    {
        public int IDCheck { get; set; }

        public DateTime? ExecDate { get; set; }

        public int IsJSON { get; set; }

        public string Data { get; set; }
    }
}
