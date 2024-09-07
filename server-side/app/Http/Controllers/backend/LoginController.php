<?php

namespace App\Http\Controllers\backend;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;

class LoginController extends Controller
{
    // Admin login system
    public function adminLogin(Request $request){
        $isEmail = preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $request->identity);
        $isPhone = preg_match('/^(?:\+?88|0088)?01[3-9]\d{8}$/', $request->identity);
        if ($isEmail) {
            $admin = User::where("email", $request->identity)->first();
        } elseif ($isPhone) {
            $admin = User::where("phone", $request->identity)->first();
        } else {
            $admin = User::where("username", $request->identity)->first();
        }
        if (!empty($admin)) {
            if (Hash::check($request->password, $admin->password)) {
                $token = $admin->createToken('mytoken')->plainTextToken;
                return response()->json([
                    'message' => 'Successfully login as admin',
                    'token' => $token,
                    'code' => 201,
                ]);
            } else {
                return response()->json([
                    'message' => 'Password not match',
                    'code' => 422,
                ]);
            }

        } else {
            return response()->json([
                'message' => 'Email/Phone/Username not match',
                'code' => 421,
            ]);
        }

    }

    public function logout(Request $request)
    {
        // $request->user()->currentAccessToken()->delete();
        $user = auth()->user();

        $token = PersonalAccessToken::where('tokenable_id', $user->id)
            ->first();
        $token->delete();

        return response()->json([
            'message' => 'Successfully logged out',
            'code' => 201,
        ]);
    }

    public function findLoggedInAdmin()
    {
        $user = auth()->user();

        if ($user) {
            $admin = $user->load('getRole');
        }
        if ($admin) {
            return response()->json([
                'admin' => $admin,
                'code' => 201
            ]);
        } else {
            return response()->json([
                'message' => "No admin logged in",
                'code' => 404
            ]);
        }
    }

    function passwordForgot(Request $request)
    {

        $user = User::where('email', $request->identity)->first();

        if ($user) {
            $existToken = DB::table('password_reset_tokens')
                    ->where('email', $request->identity)
                    ->first();

            if (empty($existToken)) {
                $token = Str::random(60);
                DB::table('password_reset_tokens')->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => now()
                ]);
                $mailData = url('') . '/admin/reset/' . $token . '/' . $request->identity;
                Mail::to($request->identity)
                ->send(new ResetPasswordMail($mailData));

                return response()->json([
                    'message' => 'Password reset email sent successfully. Check your email',
                    'code' => 201
                ]);
            } else {
                return response()->json([
                    'message' => 'You have already requested to send email. check your email',
                    'code' => 401
                ]);
            }
        } else {
            return response()->json([
                'message' => 'Email not match.',
                'code' => 401
            ]);
        }
    }

    // password update system
    public function updatePassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $token = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!empty($token)) {
            if ($request->token == $token->token) {
                $user->password = bcrypt($request->password);
                $user->update();
                DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->delete();
                return response()->json([
                    'message' => 'Password has been changed successfully.',
                    'code' => 201
                ]);
            } else {
                return response()->json([
                    'message' => 'The link has been expired',
                    'code' => 401
                ]);
            }

        } else {
            return response()->json([
                'message' => 'The link has been expired!',
                'code' => 401
            ]);

        }
    }

}
