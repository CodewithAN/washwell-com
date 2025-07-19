import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { axiosInstance } from '../utils/Api';
import Header from '../components/global/Header';
import RNText from '../components/ui/RNText';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, txtXs } from '../utils/Constant';
import Img from '../components/ui/Img';
import person from '../../assets/menu/personal.png';
import details from '../../assets/icons/detail.svg';
import Button from '../components/ui/Button';
import RNTextInput from '../components/ui/RNTextInput';
import { ContextProvider } from '../global/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_URL } from '../utils/Constant';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const { token, setToken } = useContext(ContextProvider);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let storedToken = token;
        if (!storedToken) {
          storedToken = await AsyncStorage.getItem('washwell-token');
          if (storedToken) setToken(storedToken);
        }

        if (!storedToken) {
          setGlobalError('Authentication token not found. Please log in again.');
          setLoading(false);
          return;
        }

        const instance = await axiosInstance();
        const response = await instance.get("/get-profile", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const profileData = response.data.data.user;
        const fullName = profileData.name || '';
        const nameParts = fullName.trim().split(' ');

        setFirstName(nameParts[0] || '');
        setLastName(nameParts.length > 1 ? nameParts.slice(1).join(' ') : '');
        setEmail(profileData.email || '');
        setPhoneNumber(profileData.phone || '');
        setGlobalError(null);
      } catch (err) {
        setGlobalError(
          err.response?.data?.message || 'Failed to fetch profile. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async () => {
    setPhoneError('');
    setGlobalError(null);

    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      return;
    }

    setLoading(true);
    try {
      const instance = await axiosInstance();
      await instance.post(
        "/update-profile",
        {
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${
              token || (await AsyncStorage.getItem('washwell-token'))
            }`,
          },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
    } catch (err) {
      setGlobalError(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

 

  if (globalError) {
    return (
      <View style={styles.errorContainer}>
        <RNText style={styles.errorText}>{globalError}</RNText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.mainContainer}>
        <Header space title="Personal Details" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.images}>
            <Img source={person} width={46} height={46} />
            <Img source={details} width={20} height={20} />
          </View>

          <View style={styles.details}>
            <RNTextInput label="First Name" value={firstName} onChangeText={setFirstName} />
            <RNTextInput label="Last Name" value={lastName} onChangeText={setLastName} />
            <RNTextInput label="Email" value={email} onChangeText={setEmail} />
            <RNTextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                if (text.trim()) setPhoneError('');
              }}
            />
            {phoneError ? (
              <RNText style={styles.inlineError}>{phoneError}</RNText>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Button
            title="Update Profile"
            variant="gradient"
            onPress={handleUpdateProfile}
            loading={loading}
            disabled={loading}
          />
        </View>

        <Toast />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 20,
    paddingTop: 10,
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    gap: 8,
    flex: 1,
  },
  buttonWrapper: {
    paddingHorizontal: horizantGap,
    paddingBottom: 20,
  },
  inlineError: {
    color: 'red',
    fontSize: txtXs,
    marginTop: -6,
    marginBottom: 8,
    marginLeft: 4,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: txtXs,
    color: 'red',
    textAlign: 'center',
  },
});