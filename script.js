// Function to update the displayed range and highlighted plan
const updateSliderAndPlan=()=> {
    const userSlider = document.getElementById('userSlider');
    const userSliderValue = parseInt(userSlider.value);
  
    const userRanges = [0, 10, 20, 30];
    let highlightedPlanText = '';
  
    highlightedPlanText =
    userSliderValue >= userRanges[0] && userSliderValue < userRanges[1]? 'Free': userSliderValue >= userRanges[1] && userSliderValue < userRanges[2]? 'Pro'
      : userSliderValue >= userRanges[2] && userSliderValue <= userRanges[3]
      ? 'Enterprise'
      : null; // Add a default value if none of the conditions are met
  
    document.getElementById('userSliderValue').textContent =userSliderValue + ' - ' + (userSliderValue + 10);
    document.getElementById('highlightedPlan').textContent = highlightedPlanText;
    document.getElementById('highlightedPlanAlert').style.display = 'block';
  }
  
  // Function to handle form submission
  const saveFormData=()=> {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const orderCommentsInput = document.getElementById('orderComments');
  
    const name = nameInput.value;
    const email = emailInput.value;
    const orderComments = orderCommentsInput.value;
  
    const formData = new FormData();
    formData.append('accesscode', 'SQAKV95RT4M8LGPLN57VTOPZ0');
    formData.append('firstname', name);
    formData.append('email', email);
    formData.append('message', orderComments);
  
    fetch('https://forms.maakeetoo.com/formapi/362', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP errorr! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Form submission errorr:', error);
        // alert('Form submission failed. Please try again later.');
      })
      .finally(() => {
        alert('Form submitted successfully! Congrats!!');
  
        const modal = bootstrap.Modal.getOrCreateInstance('#pricingModal');
        modal.hide();
      });
  
    nameInput.value = '';
    emailInput.value = '';
    orderCommentsInput.value = '';
  }
  
  const userSlider = document.getElementById('userSlider');
  userSlider.addEventListener('input', updateSliderAndPlan);
  
  const submitButton = document.getElementById('submitForm');
  submitButton.addEventListener('click', saveFormData);
  
  updateSliderAndPlan();