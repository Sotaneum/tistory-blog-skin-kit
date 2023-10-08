window.addEventListener("load", () => {
  const button = document.getElementById("btn")!;
  const label = document.getElementById("cnt")!;

  button.addEventListener("click", () => {
    label.innerText = `${(parseInt(label.innerText || "") || 0) + 1}`;
  });
});
