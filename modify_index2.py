import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update handleLogin to check admin key
old_handleLogin = '''    try {
      const result = await GeoHubAuth.login(email, pass);
      sp.style.display = 'none';
      ico.style.display = '';
      btn.disabled = false;
      txt.textContent = 'Sign In';

      if (!result.success) {
        showToast(result.error || 'Login failed.');
        document.getElementById('emailInp').classList.add('err');
        document.getElementById('passInp').classList.add('err');
        return;
      }

      showToast(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      setTimeout(() => {
        if (result.user.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 900);
    } catch (e) {'''

new_handleLogin = '''    try {
      const adminKey = document.getElementById('adminKeyInp').value.trim();
      const effectiveRole = selectedRole === 'admin' && adminKey === ADMIN_KEY ? 'admin' : 'standard';
      const result = await GeoHubAuth.login(email, pass);
      sp.style.display = 'none';
      ico.style.display = '';
      btn.disabled = false;
      txt.textContent = 'Sign In';

      if (!result.success) {
        showToast(result.error || 'Login failed.');
        document.getElementById('emailInp').classList.add('err');
        document.getElementById('passInp').classList.add('err');
        return;
      }

      if (effectiveRole === 'admin' && result.user.role !== 'admin') {
        showToast('Admin access requires valid admin key.');
        document.getElementById('adminKeyInp').parentElement.classList.add('err');
        return;
      }

      const finalRole = effectiveRole === 'admin' ? 'admin' : result.user.role;
      showToast(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      setTimeout(() => {
        if (finalRole === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 900);
    } catch (e) {'''

content = content.replace(old_handleLogin, new_handleLogin)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')