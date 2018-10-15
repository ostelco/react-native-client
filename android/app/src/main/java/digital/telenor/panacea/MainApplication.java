package digital.telenor.panacea;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.auth0.react.A0Auth0Package;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.crash.RNFirebaseCrashPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import org.devio.rn.splashscreen.SplashScreen; // here


import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new SplashScreenReactPackage(),
        new ReactNativeConfigPackage(),
        new RNInstabugReactnativePackage.Builder(BuildConfig.INSTABUG_TOKEN, MainApplication.this)
                .setInvocationEvent(BuildConfig.INSTABUG_INVOCATION_EVENT)
                .setPrimaryColor("#1D82DC")
                .setFloatingEdge("left")
                .setFloatingButtonOffsetFromTop(250)
                .build(),
        new RNFirebasePackage(),
        new A0Auth0Package(),
        new RNFirebaseAnalyticsPackage(),
        new RNFirebaseCrashlyticsPackage(),
        new RNFirebasePerformancePackage(),
        new RNFirebaseCrashPackage(),
        new RNFirebaseRemoteConfigPackage(),
        new RNFirebaseMessagingPackage(),
        new RNFirebaseInstanceIdPackage(),
        new RNFirebaseLinksPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
