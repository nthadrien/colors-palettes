
import { data } from "./definitions.js";


var schemo = { definition: "", pros: "", cons: "" };

// filter list
document.getElementsByName("scheme").forEach((elt) =>
  elt.addEventListener("click", function (e) {
    const name = e.target.value;
    if (e.target.checked) schemo = data[name];
  })
);

// show pros and cons;
document
  .getElementById("scheme-details")
  .addEventListener("click", async (e) => {
    const { definition, pros, cons } = schemo;
    return alert(
      `Definition : ${definition}\n
        👍🏻 Pros :\n ${pros}\n
        👎🏻 Cons :\n ${cons} `
    );
  });
