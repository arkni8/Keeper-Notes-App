# Notepad
An app to save your notes!

Powered with _Reactjs_ for frontend and _Nodejs_ for backend along with _JWT secure tokens_, every note you write in the app is secure and
can only be accessed by you!

Known Issues ->
- JWT expires in certain number of days, and on expiring, it doesn't get removed from cache and causes a 'coma' state where user can login but 
cannot fetch in user data. Solution - Logout and Log back in and everything will work just fine.

- The notes itself are not encrypted. So keep that in mind.
