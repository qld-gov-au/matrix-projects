function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5al3zystAKV":
        Script1();
        break;
  }
}

function Script1()
{
  if (/_html5.html/.test(window.location.href)) {
 if (!window.changeFocusColor){
 var sheet = document.createElement('style');
 sheet.innerHTML = ".tab-focus-box{border: 3px solid black !important;}";
 document.body.appendChild(sheet);
 window.changeFocusColor = true;
 }
}
}

