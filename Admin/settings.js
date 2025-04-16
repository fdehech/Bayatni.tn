document.addEventListener('DOMContentLoaded', function() {
    // Settings navigation
    const settingsNavBtns = document.querySelectorAll('.settings-nav-btn');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    settingsNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            settingsNavBtns.forEach(b => b.classList.remove('active'));
            settingsSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(`${this.dataset.target}-settings`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Save Changes button
    const saveChangesBtn = document.querySelector('.primary-btn');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function() {
            console.log('Saving settings...');
            
            // Simulate saving
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-save"></i> Save Changes';
                alert('Settings saved successfully!');
            }, 1500);
        });
    }
    
    // Theme options
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            themeOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            const themeName = this.querySelector('span').textContent.toLowerCase();
            console.log(`Theme changed to: ${themeName}`);
            
            // In a real application, this would apply the selected theme
            document.body.className = '';
            document.body.classList.add(`${themeName}-theme`);
        });
    });
    
    // Color pickers
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Update the text input next to the color picker
            const textInput = this.nextElementSibling;
            textInput.value = this.value;
            
            console.log(`Color changed to: ${this.value}`);
        });
        
        // Text input next to color picker
        const textInput = input.nextElementSibling;
        if (textInput) {
            textInput.addEventListener('input', function() {
                // Validate hex color format
                const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(this.value);
                if (isValidHex) {
                    input.value = this.value;
                    console.log(`Color changed to: ${this.value}`);
                }
            });
        }
    });
    
    // File inputs
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileInfo = this.parentElement.querySelector('.file-info');
            if (fileInfo) {
                if (this.files.length > 0) {
                    fileInfo.textContent = this.files[0].name;
                } else {
                    fileInfo.textContent = 'No file chosen';
                }
            }
        });
    });
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            console.log(`Setting "${settingName}" ${isEnabled ? 'enabled' : 'disabled'}`);
        });
    });
    
    // API Key and Secret actions
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.select();
            document.execCommand('copy');
            
            // Show feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 1500);
            
            alert('Copied to clipboard!');
        });
    });
    
    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
    
    // Regenerate API keys
    const regenerateBtns = document.querySelectorAll('.regenerate-btn');
    regenerateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling.previousElementSibling;
            const inputId = input.id;
            
            if (confirm(`Are you sure you want to regenerate the ${inputId === 'api-key' ? 'API Key' : 'API Secret'}? This will invalidate the current one.`)) {
                // In a real application, this would generate a new key/secret
                console.log(`Regenerating ${inputId}`);
                
                // Simulate regeneration
                if (inputId === 'api-key') {
                    input.value = 'sk_live_' + generateRandomString(30);
                } else {
                    input.value = '••••••••••••••••••••••••••••••';
                }
                
                alert(`${inputId === 'api-key' ? 'API Key' : 'API Secret'} has been regenerated.`);
            }
        });
    });
    
    // Email template buttons
    const templateBtns = document.querySelectorAll('.template-btn');
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateName = this.textContent;
            console.log(`Editing email template: ${templateName}`);
            alert(`Email template editor for "${templateName}" would open here.`);
        });
    });
});

// Helper function to generate random string for API key
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}