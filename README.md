# El7a2ny Platform

## Motivation

The El7a2ny Platform was born out of the necessity to provide a safe and efficient means for healthcare professionals to interact with patients during the COVID-19 pandemic in 2020. With physical meetings posing a significant risk, this platform aims to connect doctors and pharmacists with patients remotely, ensuring timely medical assistance without compromising anyone's well-being.

## Build Status

[![Build Status](https://img.shields.io/badge/status-under%20development-yellow)](https://img.shields.io/badge/status-under%20development-yellow)

The El7a2ny Platform is currently under development in a local environment. Continuous integration is in progress to ensure the stability and reliability of the platform during this phase.

## Code Style

When contributing to El7a2ny, please follow these coding conventions to ensure a consistent and clean codebase:

- **Indentation**: Use 2 spaces for indentation.
- **Naming Conventions**: Follow camelCase for variable and function names.
- **Comments**: Add meaningful comments to explain complex logic or algorithms.
- **Formatting**: Format your code using a code formatter, such as Prettier.

## Tech/Framework Used

- **Frontend**: React.ts
- **CSS Frameworks**: CSS Modules, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Supabase, Firebase
- **Real-time Communication**: WebRTC, Firebase, Supabase
- **Authentication**: JSON Web Token (JWT)
## Features

### Patient Registration and Management
- Register as a patient with details like username, name, email, password, date of birth, gender, mobile number, emergency contact, and health package choice.
- Upload and remove medical documents (PDF, JPEG, JPG, PNG) for personal medical history.
- Add family members with details such as name, National ID, age, gender, and relation to the patient.
- Link another patient's account as a family member using email or phone number.
  
### Doctor Registration and Management
- Submit a request to register as a doctor with details like username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background, and specialty.
- Upload required documents for doctor registration, including ID, medical licenses, and medical degree.
  
### Administrator Functions
- Login and logout as an administrator.
- Add another administrator with a set username and password.
- Remove a doctor, patient, or administrator from the system.
- View all information uploaded by a doctor to apply to join the platform.
- Accept or reject a request for a doctor to join the platform.
- Add, update, or delete health packages with different price ranges.
  
### User Authentication and Security
- Change passwords for doctors, patients, and administrators.
- Reset a forgotten password through OTP sent to email.

### Appointment and Scheduling
- View all upcoming and past appointments.
- Filter appointments by date or status (upcoming, completed, cancelled, rescheduled).
- Cancel appointments for oneself or family members.
- Receive notifications for appointment changes via the system and email.

### Health Packages
- View health package options and details.
- Subscribe to health packages for oneself and family members.
- Pay for health packages using wallet or credit card.
- View subscribed health packages and their statuses.

### Prescription Management
- View all prescriptions and their statuses (filled/unfilled).
- Download selected prescriptions (PDF).
- Pay directly for prescription items using the wallet or credit card.

### Video Calls and Messaging
- Start/end video calls with doctors/patients.
- Chat with doctors/patients.
  
### Follow-up Sessions
- Schedule follow-up sessions for patients.
- Accept or revoke follow-up session requests from patients.

### Financial Transactions
- View the amount in the wallet.
- Receive a refund in the wallet when a doctor cancels an appointment.
  
### Pharmacy Integration
- Add/delete medicines to/from the prescription.
- Add/update dosage for each medicine in the prescription.
- Add a patient's prescription.
- Update a patient's prescription before submitting it to the pharmacy.

### Search and Discovery
- View a list of all doctors along with their specialties and session prices.
- Search for doctors by name and/or specialty.
- Filter doctors by specialty and/or availability on a certain date and time.
- View all details of a selected doctor.

### Miscellaneous
- View health records of patients registered with a doctor.
- Receive notifications for appointment changes and system updates.

### Communication with Pharmacists
- Chat with pharmacists for prescription-related queries and information.


// Import required modules and models
const jwt = require('jsonwebtoken');
const refreshTokensModel = require('path-to-your-refreshTokensModel');

```// Middleware to authenticate tokens

function authenticateToken(userType = null) {
  return async (req, res, next) => {
    const { refreshToken } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
      return res.status(401).json({ message: 'Authorization header token not found' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        await refreshTokensModel.deleteMany({ token: refreshToken });
        return res.status(401).json({ message: 'Access Token is not valid' }); // should send a refresh request
      }

      const tokenRecord = await refreshTokensModel.findOne({
        username: user.username,
      });

      if (!tokenRecord) {
        await refreshTokensModel.deleteMany({ token: refreshToken });
        return res.status(401).json({ message: 'No refresh token found' });
      }

      // Verify the refresh token is valid and has not expired
      jwt.verify(
        tokenRecord.token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            await refreshTokensModel.deleteMany({ token: refreshToken });
            return res.status(401).json({ message: 'Refresh Token has expired' });
          }
        }
      );

      if (userType && user.type !== userType) {
        await refreshTokensModel.deleteMany({ token: refreshToken });
        return res.status(401).json({
          message: 'User is not authorized',
          userType: user.type,
          input: userType,
        });
      }

      req.user = user;
      next();
    });
  };
```
## Installation

### Backend

1. In the backend:
   ```bash
   npm install
  
2. In the frontend:
   ```bash
   yarn install

## API References

Here are the API endpoints used in the "El7a2ny" platform:

### User Management

#### List All Users
- **Route:** `/userAPI/getUsers`
- **Method:** GET
- **Description:** Retrieve a list of all users.

#### List All Specialities
- **Route:** `/dropdown/specialities`
- **Method:** GET
- **Description:** Retrieve a list of all medical specialities.

#### Add Family Member
- **Route:** `/patient/addFamilyMember`
- **Method:** POST
- **Description:** Add a new family member for a patient.

#### Get Family Members
- **Route:** `/patient/getFamilyMembers`
- **Method:** GET
- **Description:** Retrieve a list of family members for a patient.

### Prescription Management

#### List All Prescriptions
- **Route:** `/prescriptionAPI/getPrescriptions`
- **Method:** GET
- **Description:** Retrieve a list of all prescriptions.

#### View Single Prescription
- **Route:** `/prescriptionAPI/getPrescription/{prescriptionId}`
- **Method:** GET
- **Description:** Retrieve details of a specific prescription.

### Health Package Management

#### List All Packages
- **Route:** `/admin/getPackages`
- **Method:** GET
- **Description:** Retrieve a list of all health packages.

#### Update Package
- **Route:** `/admin/updatePackage/{packageId}`
- **Method:** PUT
- **Description:** Update details of a specific health package.

#### Create Package
- **Route:** `/admin/createPackage`
- **Method:** POST
- **Description:** Create a new health package.

#### Delete Package
- **Route:** `/admin/deletePackage/{packageId}`
- **Method:** DELETE
- **Description:** Delete a specific health package.

#### List All Admins
- **Route:** `/admin/viewAllAdmins/{adminId}`
- **Method:** GET
- **Description:** Retrieve a list of all administrators.

#### Create Admin
- **Route:** `/admin/createAdmin`
- **Method:** POST
- **Description:** Create a new administrator.

#### Delete Admin
- **Route:** `/admin/deleteAdmin`
- **Method:** DELETE
- **Description:** Delete a specific administrator.

#### View Patients
- **Route:** `/admin/viewPatients`
- **Method:** GET
- **Description:** Retrieve a list of all patients.

#### View Pharmacists
- **Route:** `/admin/viewPharmacists`
- **Method:** GET
- **Description:** Retrieve a list of all pharmacists.

#### Delete Patient
- **Route:** `/admin/deletePatient`
- **Method:** DELETE
- **Description:** Delete a specific patient.

#### Delete Pharmacist
- **Route:** `/admin/deletePharmacist`
- **Method:** DELETE
- **Description:** Delete a specific pharmacist.

#### List All Medicines
- **Route:** `/getMedicines`
- **Method:** GET
- **Description:** Retrieve a list of all medicines.

#### List All Medicinal Uses
- **Route:** `/getMedicinalUses`
- **Method:** GET
- **Description:** Retrieve a list of all medicinal uses.

### Order Management

#### List All Orders
- **Route:** `/orderAPI/getOrders`
- **Method:** GET
- **Description:** Retrieve a list of all orders.

#### Cancel Order
- **Route:** `/orderAPI/cancelOrder/{orderId}`
- **Method:** DELETE
- **Description:** Cancel a specific order.

#### Accept Doctor
- **Route:** `/admin/acceptDoctor`
- **Method:** PUT
- **Description:** Accept a doctor's registration request.

#### Reject Doctor
- **Route:** `/admin/rejectDoctor`
- **Method:** PUT
- **Description:** Reject a doctor's registration request.

#### View All Contracts
- **Route:** `/pharmacist/viewAllContracts`
- **Method:** GET
- **Description:** Retrieve a list of all contracts.

### Patient Management

#### Get All Doctors
- **Route:** `/patient/getDoctors`
- **Method:** GET
- **Description:** Retrieve a list of all doctors.

#### Search for Doctors By Name and/or Speciality
- **Route:** `/patient/getDoctorsByNameSpeciality`
- **Method:** GET
- **Description:** Search for doctors based on name and/or speciality.

#### Filter Doctors
- **Route:** `/patient/filterDoctors`
- **Method:** GET
- **Description:** Filter doctors based on criteria.

#### Get Doctor Details
- **Route:** `/patient/getDoctordetails`
- **Method:** GET
- **Description:** Retrieve details of a specific doctor.

### Doctor Management

#### List All Patients
- **Route:** `/doctor/getPatients`
- **Method:** GET
- **Description:** Retrieve a list of all patients.

#### Get Patient Information
- **Route:** `/doctor/getPatientInfo`
- **Method:** GET
- **Description:** Retrieve information about a specific patient.

#### Get Patient By Name
- **Route:** `/doctor/getPatientByName/{patientName}`
- **Method:** GET
- **Description:** Retrieve a patient by name.

#### Get Upcoming Appointments
- **Route:** `/doctor/getUpcomingAptmnts/{doctorId}`
- **Method:** GET
- **Description:** Retrieve upcoming appointments for a doctor.

#### Get Appointments
- **Route:** `/patient/getAppointments/{userType}`
- **Method:** GET
- **Description:** Retrieve appointments for a patient or a doctor.

#### View Settings
- **Route:** `/doctor/viewSettings`
- **Method:** GET
- **Description:** View doctor settings.

#### Edit Settings
- **Route:** `/doctor/editSettings`
- **Method:** PUT
- **Description:** Edit doctor settings.

### Patient/Appointment Management

#### Create Appointment
- **Route:** `/patient/createAppointment`
- **Method:** POST
- **Description:** Create a new appointment.

#### Get Appointments
- **Route:** `/patient/getAppointments/{type}`
- **Method:** GET
- **Description:** Retrieve appointments for a patient or a doctor.

#### Delete Appointment
- **Route:** `/patient/deleteAppointment/{id}`
- **Method:** DELETE
- **Description:** Delete a specific appointment.

#### Update Appointment
- **Route:** `/patient/updateAppointment/{id}`
- **Method:** PUT
- **Description:** Update details of a specific appointment.

#### Add Family Member
- **Route:** `/patient/addFamilyMember`
- **Method:** POST
- **Description:** Add a new family member for a patient.

#### Get Family Members
- **Route:** `/patient/getFamilyMembers`
- **Method:** GET
- **Description:** Retrieve a list of family members for a patient.

### Prescriptions and Health Records

#### List All Prescriptions
- **Route:** `/prescriptionAPI/getPrescriptions`
- **Method:** GET
- **Description:** Retrieve a list of all prescriptions.

#### View Single Prescription
- **Route:** `/prescriptionAPI/getPrescription/{id}`
- **Method:** GET
- **Description:** Retrieve details of a specific prescription.

#### List All Patient Health Records
- **Route:** `/patient/getHealthRecords`
- **Method:** GET
- **Description:** Retrieve health records for a patient.

### Pharmacy Management

#### List All Medicines
- **Route:** `/getMedicines`
- **Method:** GET
- **Description:** Retrieve a list of all medicines.

#### List All Medicinal Uses
- **Route:** `/getMedicinalUses`
- **Method:** GET
- **Description:** Retrieve a list of all medicinal uses.

### Package Management

#### List All Packages
- **Route:** `/getPackages`
- **Method:** GET
- **Description:** Retrieve a list of all health packages.

#### Update Package
- **Route:** `/admin/updatePackage/{packageId}`
- **Method:** PUT
- **Description:** Update details of a specific health package.

#### Create Package
- **Route:** `/admin/createPackage`
- **Method:** POST
- **Description:** Create a new health package.

#### Delete Package
- **Route:** `/admin/deletePackage/{packageId}`
- **Method:** DELETE
- **Description:** Delete a specific health package.

#### View Subscribed Package for Family Member
- **Route:** `/patient/viewSubscribedPackageforFamilyMember`
- **Method:** GET
- **Description:** View subscribed package for a family member.

#### Unsubscribe From Package
- **Route:** `/patient/unsubscribeFromPackage`
- **Method:** POST
- **Description:** Unsubscribe from a health package.

#### Unsubscribe From Package For Family
- **Route:** `/patient/unsubscribeFromPackageForFamily`
- **Method:** POST
- **Description:** Unsubscribe a family member from a health package.


## Tests

We use Postman for testing the "El7a2ny" APIs. Follow the steps below to run the tests:

1. Download and install [Postman](https://www.postman.com/).
   - Open Postman.
   - Click on the "Import" button in the top left corner.
   - Upload the Postman collection file provided in the repository (if available).

2. Set up environment variables (if required):
   - Some requests may depend on environment variables. Make sure to set them up appropriately.

3. Run the tests:
   - Navigate to the "Collections" tab in Postman.
   - Select the "El7a2ny API Tests" collection.
   - Click on the "Run" button.

4. Review the test results:
   - Postman will display the results of each request in the collection, indicating whether they passed or failed.

### Example: Testing `getMedicinalUses`

- **Method:** GET
- **Route:** `http://localhost:3000/pharmacy/getMedicinalUses`

1. Type the route in the URL 
2. Click the "Send" button to execute the request.
3. Review the response to verify that it returns the expected data.

Note: Make sure to update the Postman collection file if there are any changes to the API endpoints or request payloads.

## How to Use

### Running the Local Server

#### Backend

To start the backend server, follow these steps:

1. Open a terminal.
2. In the backend:

   ```bash
   node server
OR
  ```bash
nodemon server
```
3. In the frontend:
  ```bash
yarn start
```
### Patient Actions

1. **Register as a Patient:**
   - Navigate to the registration page.
   - Fill in the required information (username, name, email, password, etc.).
   - Optionally, choose a health package.
   - Click "Register" to create your account.

2. **Schedule a Remote Consultation:**
   - Log in with your credentials.
   - Browse the list of available doctors.
   - Choose a doctor and select an available time slot.
   - Confirm your appointment.

3. **View Health Records and Prescriptions:**
   - Log in and navigate to your dashboard.
   - Access your health records and prescriptions.

### Doctor Actions

1. **Register as a Doctor:**
   - Submit a request with necessary details.
   - Upload required documents for verification.

2. **Accept Appointment Requests:**
   - Log in and view your upcoming appointments.
   - Accept or reject appointment requests from patients.

3. **Update Profile Information:**
   - Log in and go to your profile.
   - Edit your email, hourly rate, or affiliation.

### Administrator Actions

1. **Manage User Requests:**
   - Log in as an administrator.
   - Review requests from doctors to join the platform.
   - Accept or reject requests.

2. **Manage Health Packages:**
   - Log in as an administrator.
   - Add, update, or delete health packages.

### General Tips

- Log in with your username and password.
- Explore the menu for specific actions (appointments, health records, etc.).
- Use the search or filter options for quicker navigation.

That's it! Our platform is designed to be intuitive and user-friendly. If you encounter any issues or have questions, contact our support team at [support@example.com].

## Contribute

We welcome contributions from the community to enhance and improve the "El7a2ny" platform. If you'd like to contribute, follow these guidelines:

### Reporting Issues

If you encounter any bugs, issues, or have suggestions, please report them on our [GitHub Issues](https://github.com/your-username/el7a2ny/issues) page. Provide detailed information about the problem and steps to reproduce it.

### Contributing Code

1. Fork the repository.
2. Clone your forked repository to your local machine.
Create a new branch for your feature or bug fix.

```bash
git checkout -b feature-name
```
Make your changes and commit them.
```bash
git add .
git commit -m "Description of your changes"
```
Push your changes to your fork.
```bash
git push origin feature-name
```
Open a pull request on our GitHub Pull Requests page.

Development Environment
To set up the development environment, follow the installation instructions provided in the README file. Additionally, adhere to our coding standards and conventions while making changes.

Coding Standards
Maintain a clean and consistent code style by following the established coding standards. Ensure your code is well-documented and includes appropriate comments where necessary.

Code of Conduct
Please adhere to our Code of Conduct in all interactions and contributions.

Thank you for contributing to "El7a2ny"! Your efforts help make our platform better for everyone.

## Credits

We would like to express our gratitude to the following resources and contributors that have been instrumental in the development of the "El7a2ny" platform:

- [Ant Design (antd)](https://ant.design/): A design system for enterprise-level products, which we used to enhance the visual aspects of our platform.

- [Material-UI](https://material-ui.com/): A popular React UI framework that provided components and styles for creating a cohesive user interface.

- YouTube Tutorial by [Awesome Tutorials](https://www.youtube.com/channel/UC5Ki9NuhUFCxexPqX10TI1A):
  - Tutorial Link: [React.js Tutorial](https://youtu.be/WmR9IMUD_CY?si=-fidXJ8CplfqWie9)

- Another YouTube Tutorial by [Another Channel Name](https://www.youtube.com/user/AnotherChannel):
  - Tutorial Link: [Building a Full Stack MERN Application](https://youtu.be/e-whXipfRvg?si=L_OAFO-PgU9sCqys)

These resources have been invaluable in shaping our project. We appreciate the effort and expertise shared by the creators.

## License

The "El7a2ny" platform is distributed under the [MIT License](LICENSE).

### Third-Party Libraries and Frameworks

- Ant Design (antd): [MIT License](https://github.com/ant-design/ant-design/blob/master/LICENSE)
- Material-UI: [MIT License](https://github.com/mui-org/material-ui/blob/master/LICENSE)

### External Tutorials

- YouTube Tutorial by Awesome Tutorials: 
  - Tutorial Link: [React.js Tutorial](https://youtu.be/WmR9IMUD_CY?si=-fidXJ8CplfqWie9)
  - License: Please refer to the license provided by Awesome Tutorials.

- Another YouTube Tutorial by Another Channel Name:
  - Tutorial Link: [Building a Full Stack MERN Application](https://youtu.be/e-whXipfRvg?si=L_OAFO-PgU9sCqys)
  - License: Please refer to the license provided by Another Channel Name.

Feel free to review and ensure that the licenses are appropriate for your project. Let me know if there are any further modifications or if you're ready for a final review!




