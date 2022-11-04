Digiaccel Quiz-App | NextJs

Description:
>This quiz app allows you to add quizzes based on category of the question and lets you add various questions of different difficulty.

1. How to Run 

> a. Install Dependencies
>> Install Nodejs and yarn
    npm install
    npm install --global yarn
>> MongoDb is attached via MongoDbAtlas

> b. Run 
    yarn dev

2. Page Access
> a. Add Quiz and Add Question functionality is only available to the admin.

> b. Browse Quizzes and My progress is accessable to logged in user.

> c. Only logged in users will be able to access the quizzes.

> Login:
    http://localhost:3000/login
> Signup:
    http://localhost:3000/signup
> Browse Quizzes:
    http://localhost:3000/quizzes

3. Admin Details
> Navigate to 
    http://localhost:3000/login

> Admin Credentials
    email: admin@admin.in
    password: admin

4. How to add quiz and questions
> Only admin is allowed to do this
! Please note: category is mandatory and should be consistent in a quiz, all questions are retrieved on that basis.
> To Add Quiz
> Navigate to 
    http://localhost:3000/admin/addquiz
> This will add the quiz here:
    http://localhost:3000/quizzes
> To Add Question
> Navigate to 
    http://localhost:3000/admin/addquestion
> This will add the question here:
    http://localhost:3000/quiz/<Category>
