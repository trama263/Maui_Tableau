using Microsoft.Extensions.Logging;

namespace Maui_Tableau;

public static class MauiProgram {
    static MauiProgram() {
        AppContext.SetSwitch("HybridWebView.InvokeJavaScriptThrowsExceptions", true);
    }
    public static MauiApp CreateMauiApp() {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });

#if DEBUG
        builder.Logging.AddDebug();
        builder.Services.AddHybridWebViewDeveloperTools();
#endif

        return builder.Build();
    }
}