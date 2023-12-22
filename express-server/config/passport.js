// '어떤 로그인 방식을 취하냐'를 대명사로 strategy라 함

module.exports = (app, passport) => {
    var LocalStrategy = require('passport-local').Strategy;
    
    var db = require('../config/MysqlDB')
    var conn = db.init();

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password' // form태그 password
        },
        (username, password, done) => {
            var sql = "SELECT * from users where email=? AND passwd=?";
            conn.query(sql, [username, password], (err, result) => {
                if (err) { // 계정이 없을 때
                    console.log("query is not excuted : " + err);
                    return done(err)
                } else if(result.length == 0) {
                    console.log("not exists accounts") // 계정이 없을때
                    return done(null, false, { message: 'Incorrect username.' });
                } 
                else {
                    console.log(result[0]);
                    console.log("userinfo ", result[0]);
                    return done(null, result[0]);  // result값으로 받아진 회원정보를 return해줌
                }


            })
        })
    )

    passport.serializeUser((user, done) => {
        console.log("serializeUser ", user)
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        var sql = "SELECT * FROM users WHERE id=?";
        conn.query(sql, [id], (err, result) => {
            if(err) console.log("query is not excuted : " + err)

            console.log("deserializeUser mysql result : ", result)
            done(null, result[0])
        })
    })

}