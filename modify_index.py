import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add selectRole function after <script>
script_addition = '''let selectedRole = 'standard';
   const ADMIN_KEY = 'geohub_admin_2025';

   function selectRole(role) {
     selectedRole = role;
     document.querySelectorAll('.role-tab').forEach(tab => tab.classList.remove('active'));
     document.querySelector('.role-tab[data-role="' + role + '"]').classList.add('active');
     var adminKeyRow = document.getElementById('adminKeyRow');
     if (role === 'admin') {
       adminKeyRow.style.display = 'block';
     } else {
       adminKeyRow.style.display = 'none';
     }
   }

'''

content = content.replace('<script>\n', '<script>\n' + script_addition, 1)

# Add role selector HTML - replace the card-head section
old_card_head = '''      <div class="card-head">
        <div class="c-ico">🌍</div>
        <h2>Sign In to GeoHub</h2>
        <p>Access the Zambia Spatial Data Platform</p>
      </div>

      <button id="googleLoginBtn"'''

new_card_head = '''      <div class="card-head">
        <div class="c-ico">🌍</div>
        <h2>Sign In to GeoHub</h2>
        <p>Access the Zambia Spatial Data Platform</p>
      </div>

      <div class="role-tabs" id="roleTabs">
        <div class="role-tab active" data-role="standard" onclick="selectRole('standard')">Standard User</div>
        <div class="role-tab" data-role="admin" onclick="selectRole('admin')">Admin Access</div>
      </div>

      <div style="display:none;margin-bottom:16px;" id="adminKeyRow">
        <input type="text" id="adminKeyInp" class="inp" placeholder="Enter admin key to unlock admin role"/>
      </div>

      <button id="googleLoginBtn"'''

content = content.replace(old_card_head, new_card_head)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')