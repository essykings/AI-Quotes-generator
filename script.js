$("#myModal").on("shown.bs.modal", function () {
  // Your script here
  const saveButton = document.querySelector("#myModal .btn-primary");
  const apiKeyInput = document.querySelector("#apikey");

  saveButton.addEventListener("click", function () {
    const apiKeyValue = apiKeyInput.value;
    localStorage.setItem("API_KEY", apiKeyValue);
   
  });
});



const modal = document.getElementById("key-modal");
const getData = async (prompt, API_KEY) => {
  console.log(prompt);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate 10 quotes about ${prompt}`,
          },
        ],
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return data;
    // const message = document.querySelector(".message");
    // console.log(message)
    // message.textContent = data.error.message
    // message.style.display = "block";
    // console.log(error);
  }
};

// })();
const categories = ["motivation", "encourage", "Love", "philosophy", "sadness"];

const quotesArray1 = [
  '1. "Sadness is like a heavy rain cloud that follows you wherever you go."',
  '2. "In the silence of sadness, we find the true depths of our emotions."',
  '3. "Sadness is the ache of a heart that longs to be whole again."',
  '4. "Sometimes, sadness is the only way our souls can speak."',
  '5. "Sadness is a reminder of the beauty and fragility of the human experience."',
  '6. "The weight of sadness can feel unbearable, but it is also a sign of our capacity to feel deeply."',
  '7. "Sadness is a storm that passes through, leaving behind a sense of peace and clarity."',
  '8. "In the midst of sadness, we discover the strength and resilience of our spirit."',
  '9. "Sadness is a necessary part of the journey to healing and growth."',
  '10. "The beauty of sadness is that it reminds us of the depth and complexity of our emotions."',
];
const quotes = document.querySelector(".quotes");
console.log(quotes);
const mappedCategories = categories.map((category) => {
  return `  <div class="col-lg-3 col-md-6 mb-2 px-2">
    <input
      type="radio"
      class="btn-check"
      name="mood"
      id="${category}"
      value="${category}"
      autocomplete="off"
    />

    <label
      class="btn btn-secondary d-flex align-items-center justify-content-center"
      for="${category}"
      >${category}</label
    >
  </div>
      `;
});

quotes.innerHTML = mappedCategories.join("");
const generateBtn = document.querySelector(".generate-btn");
generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const key = localStorage.getItem("API_KEY");
  console.log(key);

  if (!key) {
    const message = document.querySelector(".message");
    message.style.display = "block";
    return;
  }

  let prompt = "";
  let radio = document.querySelector('input[name="mood"]:checked');

  if (document.querySelector('input[name="mood"]:checked')) {
    radio = document.querySelector('input[name="mood"]:checked');
    prompt = radio.value;
  } else {
    prompt = document.getElementById("input").value;
  }

  const data = await getData(prompt, key); // uncomment later

  if (data.choices) {
    const container = document.getElementById("result");

    //    data from aync
    const quotesArray = data.choices[0].message.content.split("\n");
    console.log(quotesArray);

    const mappedArray = quotesArray.map((quote, index) => {
      const trimmedQuote = quote.replace(/^\d+\.|"$/g, "").trim();
      console.log(cleanedQuote);

      return ` <div class="col-sm-6 mt-5 mb-4">
            <div class="card">
              <div class="card-body">
                <p class="card-text">${trimmedQuote}</p></div>
            </div>
        </div>
        `;
    });

    container.innerHTML = mappedArray.join("");
  } else {
    const message = document.querySelector(".message");
    message.textContent = data.error.message;
    message.style.display = "block";
  }
});

const inputField = document.getElementById("input");
inputField.addEventListener("input", (e) => {
  e.preventDefault();

  const radio = document.querySelector('input[name="mood"]:checked');
  if (radio) {
    radio.checked = false;
  }
});

