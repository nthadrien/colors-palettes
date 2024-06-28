
import { data } from "./definitions.js";


var schemo = () => {
  const word = document.getElementById('color-scheme').value;
  console.log(word);
  const info = data[word];
  return info;
}


// show pros and cons;
document
  .getElementById("scheme-details")
  .addEventListener("click", async (e) => {
    const { definition, pros, cons } = schemo();
    return alert(
      `Definition : ${definition}\n
        👍🏻 Pros :\n ${pros}\n
        👎🏻 Cons :\n ${cons} `
    );
  });
