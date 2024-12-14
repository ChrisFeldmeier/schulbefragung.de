interface User {
  username: string;
  role: 'admin' | 'teacher' | 'student';
}

export async function authenticate(username: string, password: string): Promise<User | null> {
  // For demo purposes, hardcoded credentials
  if (username === 'test' && password === 'test') {
    return {
      username: 'test',
      role: 'admin'
    };
  }
  return null;
} 