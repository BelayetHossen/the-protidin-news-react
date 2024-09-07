<?php

namespace App\Http\Controllers\backend;

use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    function allRoles() {
        $data = Role::all();
        return response()->json([
            'roles' => $data,
            'code'  => 200
        ]);
    }

    function roleGet($id) {
        $data = Role::find($id);
        return response()->json([
            'role' => $data,
            'code'  => 200
        ]);
    }


    public function store(Request $request)
    {
        $exist_name = Role::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'massage' => 'The name already exists',
                'code'  => 422
            ]);
        } else {
            $role = Role::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'permissions' => json_encode($request->permissions),
            ]);
            return response()->json([
                'data' => $role,
                'massage' => 'Role saved successfully',
                'code'  => 200
            ]);
        }
    }


    public function statusChange($id)
    {
        $data = Role::find($id);
        if ($data->status===1) {
            $data->status = false;
        } else {
            $data->status = true;
        }
        $data->update();
        return response()->json(['code'=>200,'massage' => 'Status change successfully']);
    }


    public function update(Request $request)
    {
        $data = Role::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = Role::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }
        if ($exist_name == '') {
            $data->name = $request->name;
            $data->permissions = json_encode($request->permissions);
            $data->update();
            return response()->json([
                'massage' => "Role updated successfully!",
                'code'  => 200
            ]);
        } else {
            return response()->json([
                'massage' => "The name already axist !",
                'code'  => 400
            ]);
        }
    }


    public function delete($id)
    {
        $data = Role::find($id);
        $data->delete();
        return response()->json(['code'=>200,'massage' => 'Role deleted successfully']);
    }
}
