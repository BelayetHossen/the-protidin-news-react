<?php

namespace App\Http\Controllers\backend;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    function allAdmins() {
        $admins = User::with('getRole')->get();
        return response()->json([
            'admins' => $admins,
            'code'  => 200
        ]);
    }
    function adminGet($id) {
        $data = User::with('getRole')->find($id);
        return response()->json([
            'admin' => $data,
            'code'  => 200
        ]);
    }
    public function store(Request $request)
    {
        $exist_email = User::where('email', $request->email)->first();
        $exist_phone = User::where('phone', $request->phone)->first();
        $exist_username = User::where('username', $request->username)->first();
        if (!empty($exist_email)) {
            return response()->json([
                'massage' => 'The email already exists',
                'code'  => 422
            ]);
        }
        if (!empty($exist_phone)) {
            return response()->json([
                'massage' => 'The phone already exists',
                'code'  => 423
            ]);
        }
        if (!empty($exist_username)) {
            return response()->json([
                'massage' => 'The username already taken',
                'code'  => 424
            ]);
        }
        if (empty($exist_email) && empty($exist_phone) && empty($exist_username)) {
            $admin = new User();
            $admin->fname = $request->fname;
            $admin->lname = $request->lname;
            $admin->email = $request->email;
            $admin->phone = $request->phone;
            $admin->username = $request->username;
            $admin->gender = $request->gender;
            $admin->role_id = $request->role;
            $admin->password = bcrypt($request->password);

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->move(base_path('images/admins'), $imageName);
                $admin->photo = $imageName;
            } else {
                $imageName = '';
            }
            $admin->save();
            return response()->json([
                'data' => $request->all(),
                'massage' => 'New admin saved successfully',
                'code'  => 200
            ]);
        }


    }
    public function update(Request $request)
    {

        $data = User::find($request->id);

        if ($request->email != $data->email) {
            $exist_email = User::where('email', $request->email)->first();
        } else {
            $exist_email = '';
        }
        if ($request->phone != $data->phone) {
            $exist_phone = User::where('phone', $request->phone)->first();
        } else {
            $exist_phone = '';
        }
        if ($request->username != $data->username) {
            $exist_username = User::where('username', $request->username)->first();
        } else {
            $exist_username = '';
        }

        if (!empty($exist_email)) {
            return response()->json([
                'massage' => 'The email already exists'.' '.$request->email,
                'code'  => 422
            ]);
        }
        if (!empty($exist_phone)) {
            return response()->json([
                'massage' => 'The phone already exists'.' '.$request->phone,
                'code'  => 423
            ]);
        }
        if (!empty($exist_username)) {
            return response()->json([
                'massage' => 'The username already taken'.' '.$request->username,
                'code'  => 424
            ]);
        }
        $imageName = $request->old_photo;
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(base_path('images/admins'), $imageName);

            // Delete old photo if it exists
            if ($data->photo && file_exists(base_path('images/admins/' . $data->photo))) {
                unlink(base_path('images/admins/' . $data->photo));
            }
        }
        if (empty($exist_email) && empty($exist_phone) && empty($exist_username)) {

            $data->fname = $request->fname;
            $data->lname = $request->lname;
            $data->email = $request->email;
            $data->phone = $request->phone;
            $data->username = $request->username;
            $data->gender = $request->gender;
            $data->role_id = $request->role;
            $data->password = bcrypt($request->password);

            $data->photo = $imageName;
            $data->update();
            return response()->json([
                'data' => $request->all(),
                'massage' => 'Admin updated successfully',
                'code'  => 200
            ]);
        }

    }

    public function delete($id)
    {
        $data = User::find($id);
        // Delete old photo if it exists
        if ($data->photo && file_exists(base_path('images/admins/' . $data->photo))) {
            unlink(base_path('images/admins/' . $data->photo));
        }
        $data->delete();
        return response()->json(['code'=>200,'massage' => 'Admin deleted successfully']);
    }
}
