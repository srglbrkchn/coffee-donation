const buttons = document.querySelectorAll(".coffee-btn");

function toggleOpacity(button) {
  button.classList.toggle("clicked");
}

function playAudio() {
  let audio = document.getElementById("change-audio");
  audio.play();
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    toggleOpacity(button);
    playAudio();

    const itemId = parseInt(event.target.id);
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: itemId, quantity: 1 }],
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => {
          Promise.reject(json);
        });
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  });
});
