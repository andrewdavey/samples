using Cassette;
using Cassette.HtmlTemplates;
using Cassette.Scripts;
using Cassette.Stylesheets;

namespace Modal
{
    /// <summary>
    /// Configures the Cassette asset bundles for the web application.
    /// </summary>
    public class CassetteBundleConfiguration : IConfiguration<BundleCollection>
    {
        public void Configure(BundleCollection bundles)
        {
            bundles.AddPerSubDirectory<ScriptBundle>("Client");
            bundles.AddPerSubDirectory<StylesheetBundle>("Client");
            bundles.AddPerSubDirectory<HtmlTemplateBundle>("Client");
        }
    }
}