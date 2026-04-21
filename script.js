console.log("Website Loaded Successfully");
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('appDate');
        if (dateInput) {
            dateInput.min = today;
        }
        
        const dobInput = document.getElementById('dob');
        if (dobInput) {
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
            dobInput.max = eighteenYearsAgo.toISOString().split('T')[0];
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            
            let isValid = true;
            
            const name = document.getElementById('fullName').value.trim();
            if (name === '') {
                document.getElementById('nameError').textContent = 'Please enter your full name';
                isValid = false;
            } else if (name.length < 3) {
                document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
                isValid = false;
            }
            
            const email = document.getElementById('email').value.trim();
            const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            const phone = document.getElementById('phone').value.trim();
            if (phone === '') {
                document.getElementById('phoneError').textContent = 'Please enter your phone number';
                isValid = false;
            } else if (phone.replace(/[^0-9]/g, '').length < 10) {
                document.getElementById('phoneError').textContent = 'Please enter a valid phone number (10+ digits)';
                isValid = false;
            }
            
            const dob = document.getElementById('dob').value;
            if (dob === '') {
                document.getElementById('dobError').textContent = 'Please enter your date of birth';
                isValid = false;
            } else {
                const dobDate = new Date(dob);
                const todayDate = new Date();
                let age = todayDate.getFullYear() - dobDate.getFullYear();
                const monthDiff = todayDate.getMonth() - dobDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < dobDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    document.getElementById('dobError').textContent = 'You must be at least 18 years old';
                    isValid = false;
                }
            }
            
            const dept = document.getElementById('department').value;
            if (dept === '') {
                document.getElementById('deptError').textContent = 'Please select a department';
                isValid = false;
            }
            
            const doctor = document.getElementById('doctor').value;
            if (doctor === '') {
                document.getElementById('doctorError').textContent = 'Please select a doctor';
                isValid = false;
            }
            
            const appDate = document.getElementById('appDate').value;
            if (appDate === '') {
                document.getElementById('dateError').textContent = 'Please select an appointment date';
                isValid = false;
            } else {
                const selectedDate = new Date(appDate);
                const todayDate = new Date();
                todayDate.setHours(0, 0, 0, 0);
                if (selectedDate < todayDate) {
                    document.getElementById('dateError').textContent = 'Appointment date cannot be in the past';
                    isValid = false;
                }
            }
            
            const appTime = document.getElementById('appTime').value;
            if (appTime === '') {
                document.getElementById('timeError').textContent = 'Please select a time';
                isValid = false;
            }
            
            const symptoms = document.getElementById('symptoms').value.trim();
            if (symptoms === '') {
                document.getElementById('symptomsError').textContent = 'Please describe your symptoms';
                isValid = false;
            } else if (symptoms.length < 10) {
                document.getElementById('symptomsError').textContent = 'Please provide more details (at least 10 characters)';
                isValid = false;
            }
        
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                document.getElementById('termsError').textContent = 'You must agree to the terms';
                isValid = false;
            }
            
            if (isValid) {
                const appointmentData = {
                    name: name,
                    email: email,
                    phone: phone,
                    dob: dob,
                    department: dept,
                    doctor: doctor,
                    date: appDate,
                    time: appTime,
                    symptoms: symptoms,
                    dateSubmitted: new Date().toISOString()
                };
                
                let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                appointments.push(appointmentData);
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                // Hide form, show success
                document.querySelector('.appointment-form form').style.display = 'none';
                document.querySelector('.appointment-form > p').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
            }
        });
    }
});