package com.pocketly.ai

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import androidx.activity.enableEdgeToEdge
import android.os.Bundle  // Required for onCreate parameter
import android.util.Log


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "PocketPal"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
      Log.d("MainActivity", "onCreate called")
      try {
          enableEdgeToEdge()
          Log.d("MainActivity", "enableEdgeToEdge completed")
          
          // Pass null to prevent react-native-screens fragments from being restored
          // This fixes the "Screen fragments should never be restored" crash
          // See: https://github.com/software-mansion/react-native-screens/issues/17
          // and https://github.com/software-mansion/react-native-screens?tab=readme-ov-file#android
          super.onCreate(null)
          Log.d("MainActivity", "super.onCreate(null) completed successfully")
      } catch (e: Exception) {
          // Log the error and try with savedInstanceState if null fails
          Log.e("MainActivity", "Error in onCreate with null savedInstanceState", e)
          try {
              super.onCreate(savedInstanceState)
              Log.d("MainActivity", "super.onCreate(savedInstanceState) completed as fallback")
          } catch (e2: Exception) {
              Log.e("MainActivity", "Critical error in onCreate", e2)
              // If both fail, we need to finish the activity to prevent ANR
              finish()
              return
          }
      }
  }

  override fun onStart() {
      Log.d("MainActivity", "onStart called")
      try {
          super.onStart()
      } catch (e: Exception) {
          Log.e("MainActivity", "Error in onStart", e)
      }
  }

  override fun onResume() {
      Log.d("MainActivity", "onResume called")
      try {
          super.onResume()
      } catch (e: Exception) {
          Log.e("MainActivity", "Error in onResume", e)
      }
  }

  override fun onPause() {
      Log.d("MainActivity", "onPause called")
      try {
          super.onPause()
      } catch (e: Exception) {
          Log.e("MainActivity", "Error in onPause", e)
      }
  }

  override fun onDestroy() {
      Log.d("MainActivity", "onDestroy called")
      try {
          super.onDestroy()
      } catch (e: Exception) {
          Log.e("MainActivity", "Error in onDestroy", e)
      }
  }
}
