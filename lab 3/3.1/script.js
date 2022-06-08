let start = document.getElementById("ustaw");
start.addEventListener("click", function() {style(true);});
let end = document.getElementById('skasuj');
end.addEventListener("click", function() {style(false);});

function style(add) {
    if (add) {
        const body_st = document.body.style;
        body_st.padding = "1%";
        body_st.marginTop = "0px 25px 0px 25px";
        body_st.display = "grid";
        body_st.gridTemplateColumns = "1fr 1fr";
        body_st.gridTemplateAreas = "'hdr hdr' 'nvul sd' 'mn sd' 'ftr ftr'";
        body_st.columnGap = "2%";
        body_st.rowGap = "2%";

        document.getElementsByTagName("aside")[0].style.gridArea = "sd";
        document.getElementsByTagName("aside")[0].style.height = "fit-content";
        document.getElementsByTagName("footer")[0].style.gridArea = "ftr";
        document.getElementsByTagName("header")[0].style.gridArea = "hdr";
        document.getElementsByTagName("main")[0].style.gridArea = "mn";
        document.getElementsByTagName("main")[0].style.width = "fit_content";
        document.getElementsByTagName("blockquote")[0].style.fontFamily = "Arial, Helvetica, sans-serif";
        document.getElementsByTagName("blockquote")[0].style.whiteSpace = "pre-line";
        document.getElementsByTagName("nav")[0].style.width = "fit-content";
        document.getElementsByTagName("nav")[0].style.gridArea = "nvul";

        document.getElementsByTagName("ul")[0].style.padding = "20px 0 20px 0";
        let list = document.getElementsByTagName("li");
        for (let i=0; i<list.length; i++) {
            list[i].style.marginLeft = "40px";
        };

        var azure = document.getElementsByClassName("azure");
        for(var i=0; i<azure.length; i++) {
            azure[i].style.backgroundColor = "#EFF";
            azure[i].style.border = "2px solid black";
            azure[i].style.boxShadow = "0px 0px 10px #A8A8A8";
            azure[i].style.padding = "10px";
        };
    } else {
        document.body.removeAttribute("style");

        document.getElementsByTagName("aside")[0].removeAttribute("style");
        document.getElementsByTagName("aside")[0].removeAttribute("style");
        document.getElementsByTagName("footer")[0].removeAttribute("style");
        document.getElementsByTagName("header")[0].removeAttribute("style");
        document.getElementsByTagName("main")[0].removeAttribute("style");
        document.getElementsByTagName("main")[0].removeAttribute("style");
        document.getElementsByTagName("blockquote")[0].removeAttribute("style");
        document.getElementsByTagName("blockquote")[0].removeAttribute("style");
        document.getElementsByTagName("nav")[0].removeAttribute("style");
        document.getElementsByTagName("nav")[0].removeAttribute("style");

        document.getElementsByTagName("ul")[0].removeAttribute("style");
        let list = document.getElementsByTagName("li");
        for (let i=0; i<list.length; i++) {
            list[i].removeAttribute("style");
        };

        var azure = document.getElementsByClassName("azure");
        for(var i=0; i<azure.length; i++) {
            azure[i].removeAttribute("style");
        };
    }
}