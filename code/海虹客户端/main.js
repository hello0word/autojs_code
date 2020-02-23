"ui";

ui.layout(
    <vertical>
        
        <ScrollView>
           <webview id="webview" h="300" margin="0 16" />
                
        </ScrollView>
    </vertical>
)

ui.webview.loadUrl("file:///index.html");
