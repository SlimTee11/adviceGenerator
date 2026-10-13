const URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("adviceId");
const adviceText = document.getElementById("advice");
const adviceButton = document.getElementById("advice-Button");

function render(slip) {
    adviceId.textContent = `ADVICE#${slip.id}`;
    adviceText.textContent = `"${slip.advice}"`;
}

async function getAdvice() {
    try{
        adviceButton.disabled = true;
        adviceButton.setAttribute("aria-busy","true");
        adviceText.textContent = "Loading advice...";

        const response = await fetch(URL);

        if(!response.ok) {
            throw new Error('Status ${response.status}');
        }
        const data = await response.json();

        console.log(data);
        const {slip} = data;
        render(slip);
    } catch(error){
        console.error(error);

        adviceId.textContent = "OOPS";
        adviceText.textContent = "Unable to load advice now. Please try again later.";
    } finally {
       adviceButton.disabled = false; 
    }
}

adviceButton.addEventListener("click", getAdvice);

getAdvice();

















