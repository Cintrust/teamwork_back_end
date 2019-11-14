const Request = require('request');
const jwt = require('jsonwebtoken');


describe('When i make a post request ', () => {
  const base_url = 'http://localhost:3000/v1';
  describe(' to the auth/create-user route', () => {
    const route = `${base_url}/auth/create-user`;

    describe('with a valid data ', () => {
      const user = {
        firstName: 'emeka',
        lastName: 'james',
        email: 'cint@cit.com',
        password: 'simple',
        gender: 'male',
        jobRole: 'user',
        department: 'human resource',
        address: 'no 5 igbo st',

      };
      const token = jwt.sign(
        { userId: 1 },
        process.env.SECRET,
        { expiresIn: '24h' },
      );
      const data = {};


      beforeAll((done) => {
        const options = {
          url: route,
          headers: {
            Token: token,
          },
          body: user,
          json: true,
        };
        Request.post(options, (error, response, body) => {
          data.status = response.statusCode;
          data.body = typeof body === 'string' ? JSON.parse(body) : body;
          done();
        });
      });


      it('should authenticate my request', () => {
        expect(data.status)
          .toBe(200);
      });
      it('should return a valid data', () => {
        expect(data.body.status)
          .toBe('success');
        expect(data.body.data.token)
          .toEqual(jasmine.any(String));
        expect(data.body.data.message)
          .toEqual(jasmine.any(String));
        expect(data.body.data.userId)
          .toEqual(jasmine.any(Number));
      });
    });
  });
  describe('to auth/login', () => {
    describe(' with valid data', function () {

      const data = {};
      const route = `${base_url}/auth/signin`;
      const user = {
        email: 'cint@cint.com',
        password: 'simple',
      };
      beforeAll((done) => {
        const options = {
          url: route,
          body: user,
          json: true,
        };
        Request.post(options, (error, response, body) => {
          data.status = response.statusCode;
          data.body = typeof body === 'string' ? JSON.parse(body) : body;
          console.log(response);
          done();
        });
      });
      it('should authenticate login', () => {
        expect(data.status)
          .toBe(200);
      });
      it('should return a login data', () => {
        expect(data.body.status)
          .toBe('success');
        expect(data.body.data.token)
          .toEqual(jasmine.any(String));

        expect(data.body.data.userId)
          .toEqual(jasmine.any(Number));
      });
    });

  });
});
