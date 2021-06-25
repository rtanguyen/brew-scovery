const checkboxes = document.querySelectorAll(
    'input[type=checkbox][name="ingredient"]'
  );
  let listArr = [];
  
  //cross off checked items and remove from list to save to database
  function shoppingListHandler() {
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function (event) {
        event.preventDefault();
        $(this).closest("label").toggleClass("strikethrough", this.checked);
  
        listArr = Array.from(checkboxes)
          .filter((i) => !i.checked)
          .map((i) => i.value);
        console.log(listArr);
        return listArr;
      });
    });
  }
  
  //save new list to database
  async function updateList(event) {
    event.preventDefault();
  
    //TODO: update route
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      body: JSON.stringify({
        listArr,
        //id of new list
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("=============================", response);
  
      //TODO: update route
      document.location.replace("/useraccount");
    } else {
      alert(response.statusText);
    }
  }
  
  shoppingListHandler();
  