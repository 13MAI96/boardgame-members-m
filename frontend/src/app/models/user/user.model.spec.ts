import { FullUser, User } from "./user";

describe('Model: User', () => {
    it('should create an instance with provided data', () => {
      const user = new User({
        _id: '123',
        name: 'Alice',
        role: 'Player',
        updatedAt: new Date(),
      });

      expect(user._id).toBe('123');
      expect(user.name).toBe('Alice');
      expect(user.role).toBe('Player');
    });

    it('should create an instance with provided data', () => {
      const user = new FullUser(
        {
          _id: '123',
          name: 'Alice',
          role: 'Player',
          updatedAt: new Date(),
        }, {
          email: 'hello@hello.hello', 
          picture: 'picture', 
          sub: ''
        }
      );
      expect(user._id).toBe('123');
      expect(user.picture).toBe('picture');
    });

    it('#updateFromApi should return the instance updated with provided data', () => {
      const user = new FullUser(
        {
          _id: '123',
          name: 'Alice',
          role: 'Player',
          updatedAt: new Date(),
        }, {
          email: 'hello@hello.hello', 
          picture: 'picture', 
          sub: ''
        }
      );
      expect(user._id).toBe('123');
      expect(user.picture).toBe('picture');
      const new_user = user.updateFromApi({_id: '234'})
      expect(new_user).toBeInstanceOf(FullUser)
      expect(new_user._id).toBe('234')
      expect(new_user.name).toBe('Alice')
      expect(new_user).toEqual(user)

      const new_user_2 = new_user.updateFromApi({name: 'Jon'})
      expect(new_user_2.name).toBe('Jon')
      expect(new_user_2._id).toBe(new_user._id)
    });

  });