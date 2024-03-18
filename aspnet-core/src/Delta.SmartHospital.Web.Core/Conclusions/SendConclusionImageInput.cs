using System;

namespace Delta.SmartHospital.Web.Conclusion
{
    public class SendConclusionImageInput
    {
        public Guid Id { get; set; }
        public string ImageBase64String { get; set; }
    }
}
