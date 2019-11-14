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
        'RANDOM_TOKEN_SECRET',
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
          console.log({
            error,
            response,
            body
          });
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
        expect(data.body.data)
          .toEqual(jasmine.any(Object));
      });


    });
  });
});
