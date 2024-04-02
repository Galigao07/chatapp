export function AlertModal(message:any): HTMLElement {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal';
    // modalContainer.style.transition = 'opacity 0.3s ease'; 

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';


    const modalContentHeader = document.createElement('div');
    modalContentHeader.className = 'modal-header'


    const TitleMessage = document.createElement('h2')
    TitleMessage.textContent = 'Error Message!'
    TitleMessage.style.fontSize='30px'
    TitleMessage.style.color='red'

    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-exclamation-triangle'; // Assuming you're using Font Awesome for icons
    errorIcon.style.marginRight = '5px'; // Add some spacing between the icon and text
    errorIcon.style.color='red'
    // Add animation to the error icon
    errorIcon.style.animation = 'bounce 1s infinite'; 

    const MessageLabel = document.createElement('span')
    MessageLabel.textContent = message
    MessageLabel.style.color='blue'
    MessageLabel.style.fontSize='20px'
    modalContentHeader.appendChild(TitleMessage)
    modalContentHeader.appendChild(errorIcon)
  
    modalContent.appendChild(modalContentHeader);
    // modalContent.appendChild(TitleMessage);
    modalContent.appendChild(MessageLabel);
    // Append close button to modal content


    // Append modal content to modal container
    modalContainer.appendChild(modalContent);

    // Return modal container
    return modalContainer;
}