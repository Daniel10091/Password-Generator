export class PasswordService {

  private static readonly server: string = "http://172.16.26.125:3000";

  public static getAll = async () => {
    const response = await fetch(this.server + '/passwords');
    const passwords = await response.json();
    return passwords;
  }

  public static findById = async (id: string) => {
    try {
      const response = await fetch(this.server + `/passwords/${id}`);
      const password = await response.json();
      return password;
    } catch (error) {
      throw error;
    }
  }

  public static save = async (key: string, value: string) => {
    await fetch(this.server + '/passwords', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: key,
        value: value
      }),
    })
  }

  public static update = async (id: string, key: string, value: string) => {
    await fetch(this.server + `/passwords/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: key,
        value: value
      }),
    })
  }

  public static async delete(id: string) {
    await fetch(this.server + `/passwords/${id}`, {
      method: 'DELETE',
    })
  }

}
