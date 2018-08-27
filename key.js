module.exports = {
    db:{
        remote:null,
        local: 'myDB'
    },
    session:{
        secret: 'nodejs'
    }
    
    // resave: true,
    // saveUninitialized: true
}

//  secret: cookie_secret,
//     name: cookie_name,
//     store: sessionStore, // connect-mongo session store
//     proxy: true,
//     resave: true,
//     saveUninitialized: true