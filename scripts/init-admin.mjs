import { registerUser } from '../server/db.ts';
import { hashPassword } from '../server/_core/auth.ts';

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'admin123456';
const email = process.argv[4] || 'admin@samroiyot.com';

console.log(`Creating admin user: ${username}`);
console.log(`Email: ${email}`);

try {
  const user = await registerUser(username, email, password);
  if (user) {
    console.log('✓ Admin user created successfully');
    console.log(`Username: ${user.username}`);
    console.log(`Email: ${user.email}`);
  } else {
    console.log('✗ Failed to create user (may already exist)');
  }
} catch (error) {
  console.error('Error:', error);
}

process.exit(0);
