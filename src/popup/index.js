import "../styles/popup.scss";

if(document.getElementById("checkbox_option"))
	document.getElementById("checkbox_option").addEventListener("click", someFunction);

function someFunction(event) {
   var checked = document.getElementById("checkbox_option").checked? 'checked' : 'unchecked';
   localStorage.setItem('checkbox', checked);
   let params = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs.query(params, gotTab);

    function gotTab(tabs) {
      let msg = {
        type: checked,
      };
      chrome.tabs.sendMessage(tabs[0].id, msg);
    }
}

setInterval(()=>{
  var checked = localStorage.getItem('checkbox');
  
  if(checked == 'checked'){
    document.getElementById("checkbox_option").checked = true;
  }else{
    document.getElementById("checkbox_option").checked = false;
  }
},100);