using System.Diagnostics;
using System.Text.Json.Serialization;

namespace MauiApp2 {
    public partial class MainPage : ContentPage {
      

        public MainPage() {
            InitializeComponent();
            HybridWebView.SetInvokeJavaScriptTarget(this);

 
        }
        
        private async void OnSendMessageButtonClicked(object? sender, EventArgs e) {
            HybridWebView.SendRawMessage($"Hello from C#!");
        }

        private async void OnHybridWebViewRawMessageReceived(object? sender, HybridWebViewRawMessageReceivedEventArgs e) {
            Console.WriteLine($"RawMessageReceived {e.Message}");
            DisplayAlert("RawMessageReceived Event", e.Message, "OK");
        }

        private async void CallJSAddNumbers_OnClicked(object? sender, EventArgs e) {
            var result = await HybridWebView.InvokeJavaScriptAsync(
                "addNumbers", // Method name
                IntContext.Default.Int32, // Return type
                [4, 4], // Input parameter values
                [IntContext.Default.Int32, IntContext.Default.Int32]); // Input parameter types
            await DisplayAlert("Without generic argument", $"{result}", "OK");
        }
        private async void CallJSAddNumbers2_OnClicked(object? sender, EventArgs e) {
            var result = await HybridWebView.InvokeJavaScriptAsync<int>(
                "addNumbers", // Method name
                IntContext.Default.Int32, // Return type
                [4, 4], // Input parameter values
                [IntContext.Default.Int32, IntContext.Default.Int32]); // Input parameter types
            await DisplayAlert("With generic argument", $"{result}", "OK");
        }
        
        
        public void DoSyncWork() {
            Debug.WriteLine("DoSyncWork");
        }

        public void DoSyncWorkParams(int i, string s) {
            Debug.WriteLine($"DoSyncWorkParams: {i}, {s}");
        }

        public string DoSyncWorkReturn() {
            Debug.WriteLine("DoSyncWorkReturn");
            return "Hello from C#!";
        }

        public SyncReturn DoSyncWorkParamsReturn(int i, string s) {
            Debug.WriteLine($"DoSyncWorkParamReturn: {i}, {s}");
            return new SyncReturn {
                Message = "Hello from C#!" + s,
                Value = i
            };
        }

        public async Task DoAsyncWork() {
            Debug.WriteLine("DoAsyncWork");
            await Task.Delay(1000);
        }

        public async Task DoAsyncWorkParams(int i, string s) {
            Debug.WriteLine($"DoAsyncWorkParams: {i}, {s}");
            await Task.Delay(1000);
        }

        public async Task<String> DoAsyncWorkReturn() {
            Debug.WriteLine("DoAsyncWorkReturn");
            await Task.Delay(1000);
            return "Hello from C#!";
        }

        public async Task<SyncReturn> DoAsyncWorkParamsReturn(int i, string s) {
            Debug.WriteLine($"DoAsyncWorkParamsReturn: {i}, {s}");
            await Task.Delay(1000);
            return new SyncReturn {
                Message = "Hello from C#!" + s,
                Value = i
            };
        }    

        public class SyncReturn {
            public string? Message { get; set; }
            public int Value { get; set; }
        }

       
    }

    //[JsonSourceGenerationOptions(WriteIndented = true)]
    [JsonSerializable(typeof(int))]
    internal partial class IntContext : JsonSerializerContext;
}