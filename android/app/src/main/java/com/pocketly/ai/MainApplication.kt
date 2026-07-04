package com.pocketly.ai

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.pocketly.ai.BuildConfig
import com.pocketly.ai.download.DownloadPackage
import com.pocketly.ai.DeviceInfoPackage
import com.pocketly.ai.KeepAwakePackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            try {
                PackageList(this).packages.apply {
                  // Packages that cannot be autolinked yet can be added manually here, for example:
                  // add(MyReactNativePackage())
                  // Additional packages are auto-linked
                  try {
                      add(DownloadPackage())
                      android.util.Log.d("MainApplication", "DownloadPackage added successfully")
                  } catch (e: Exception) {
                      android.util.Log.e("MainApplication", "Error adding DownloadPackage", e)
                  }
                  
                  try {
                      add(DeviceInfoPackage())
                      android.util.Log.d("MainApplication", "DeviceInfoPackage added successfully")
                  } catch (e: Exception) {
                      android.util.Log.e("MainApplication", "Error adding DeviceInfoPackage", e)
                  }
                  
                  try {
                      add(KeepAwakePackage())
                      android.util.Log.d("MainApplication", "KeepAwakePackage added successfully")
                  } catch (e: Exception) {
                      android.util.Log.e("MainApplication", "Error adding KeepAwakePackage", e)
                  }
                }
            } catch (e: Exception) {
                android.util.Log.e("MainApplication", "Error initializing packages", e)
                // Return minimal package list if initialization fails
                listOf()
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    android.util.Log.d("MainApplication", "onCreate called")
    super.onCreate()
    try {
      android.util.Log.d("MainApplication", "Initializing SoLoader")
      SoLoader.init(this, OpenSourceMergedSoMapping)
      android.util.Log.d("MainApplication", "SoLoader initialized successfully")
      
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        android.util.Log.d("MainApplication", "Loading New Architecture")
        // If you opted-in for the New Architecture, we load the native entry point for this app.
        load()
        android.util.Log.d("MainApplication", "New Architecture loaded successfully")
      } else {
        android.util.Log.d("MainApplication", "Using legacy architecture")
      }
      android.util.Log.d("MainApplication", "MainApplication onCreate completed successfully")
    } catch (e: Exception) {
      android.util.Log.e("MainApplication", "Error initializing application", e)
      // Don't crash the app, let it try to continue
    }
  }
}
